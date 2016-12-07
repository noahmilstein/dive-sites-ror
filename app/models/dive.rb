class Dive < ActiveRecord::Base
  belongs_to :user
  belongs_to :divesite

  validates :datetime, presence: true

  DIVESITES = Divesite.all

  ## pending future validation with active record callbacks
  # validates :air_temp
  # validates :water_temp
  # validates :wave_height
  # validates :wind_speed
  # validates :tide
  # validates :wind_direction
  # validates :weather_description
  # validates :precipitation

  after_create :set_weather

  def date_within_7_days?
    Time.now.to_datetime + 7 > self.datetime
  end

  def set_weather
    date = self.format_date
    time = self.format_time
    @divesite = Divesite.where(id: self.divesite_id)[0]
    @api_result = HTTParty.get("http://api.worldweatheronline.com/premium/v1/marine.ashx?key=#{ENV['MARINE_WEATHER_API_KEY']}&format=json&q=#{@divesite.latitude},#{@divesite.longitude}")
    if date_within_7_days?
      dive_date = @api_result["data"]["weather"].select { |key, value| key["date"] == date }
      dive_time = dive_date[0]["hourly"].find { |hourly_hash| hourly_hash["time"] == time }
      if self.air_temp != dive_time["tempF"] ||
        self.water_temp != dive_time["waterTemp_F"] ||
        self.wave_height != dive_time["swellHeight_ft"] ||
        self.wind_speed != dive_time["windspeedMiles"] ||
        self.wind_direction != dive_time["winwinddir16PointdspeedMiles"] ||
        self.weather_description != dive_time["winddir16Point"] ||
        self.precipitation != dive_time["precipMM"]

        self.update_attributes(
          air_temp: dive_time["tempF"],
          water_temp: dive_time["waterTemp_F"],
          wave_height: dive_time["swellHeight_ft"],
          wind_speed: dive_time["windspeedMiles"],
          wind_direction: dive_time["winddir16Point"],
          weather_description: dive_time["weatherDesc"][0]["value"],
          precipitation: dive_time["precipMM"]
        )
      end
    end
  end

  def format_date
    date_string = self.datetime.to_s.split(' ')[0]
      .to_date.strftime('%Y-%m-%d').to_s
  end

  def format_time
    split_time = self.datetime.to_s.split(' ')
    date = split_time[0]
    time = split_time[1]
      .gsub(/:/, '')[0..3]
      .to_i
      .round(-2)
    quotient = (time.to_f / 300).round(0)
    result = (quotient * 300).to_s
  end

  def send_reminder
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']

    # set up a client to talk to the Twilio REST API
    @client = Twilio::REST::Client.new(account_sid, auth_token)

    user = User.where(id: self.user_id)[0]

    @client.account.messages.create(
      from: '+15082834493',
      to: "+1#{user.phone_number}",
      body: self.message
    )
  end

  def message
    site = Divesite.where(id: self.divesite_id)[0]

    %Q{
      DIVE WEATHER UPDATE

      Site: #{site.name}
      Date: #{self.datetime}
      Air Temp: #{self.air_temp}
      Water Temp: #{self.water_temp}
      Wave Height: #{self.wave_height}
      Weather Description: #{self.weather_description}
      Precipitation: #{self.precipitation}
    }
  end
end
