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

  def send_reminder?
    #if there is any change in this dive weather data, return true
      # Air Temp:
      # Water Temp:
      # Wave Height:
      # Weather Description:
      # Precipitation:
  end

  def message
    site = Divesite.where(id: self.divesite_id)[0]

    %Q{
      DIVE WEATHER UPDATE

      Site: #{site}
      Date: #{self.datetime}
      Air Temp: #{self.air_temp}
      Water Temp: #{self.water_temp}
      Wave Height: #{self.wave_height}
      Weather Description: #{self.weather_description}
      Precipitation: #{self.precipitation}
    }
  end
end
