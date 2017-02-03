class DivesController < ApplicationController
  before_action :authenticate_user!

  def index
    @dives = Dive.where(user: current_user, archive: false)

    # @dives.each do |dive|
    #   dive[:name] = dive.divesite.name
    # end

    updated_dives = []
    @dives.each do |dive|
      hash = {}
      hash[:id] = dive.id
      hash[:user_id] = dive.user_id
      hash[:name] = dive.divesite.name
      hash[:air_temp] = dive.air_temp
      hash[:air_temp] = dive.air_temp
      hash[:water_temp] = dive.water_temp
      hash[:wave_height] = dive.wave_height
      hash[:wind_speed] =  dive.wind_speed
      hash[:wind_direction] =  dive.wind_direction
      hash[:weather_description] =  dive.weather_description
      hash[:precipitation] =  dive.precipitation
      hash[:datetime] =  dive.datetime.strftime('%A, %B %e, %Y @ %l:%M %p')
      hash[:archive] =  dive.archive
      updated_dives << hash
    end

    dives_json = { 'dives': updated_dives, 'currentUser': current_user }

    respond_to do |format|
      format.json { render json: dives_json }
      format.html
    end
  end

  def new
    @dive = Dive.new
    @divesites = Divesite.all.order(:name)
  end

  def create
    user_id = current_user.id
    divesite_id = Divesite.where(name: params[:site])[0].id
    datetime = params[:date].to_datetime

    response = HTTParty.get("https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=#{ENV['GOOGLE_TIME_ZONE_API_KEY']}")

    offset_in_hours = response['rawOffset'] / 3600

    datetime_with_offset = datetime.change(offset: offset_in_hours.to_s)

    @dive = Dive.new(divesite_id: divesite_id, user_id: user_id, datetime: datetime)

    if @dive.save
      flash[:notice] = 'Dive scheduled successfully!'
      redirect_to @dive
    else
      flash[:notice] = @dive.errors.full_messages.join(', ')
      render :new
    end
  end

  def show
    @dive = Dive.find(params[:id])
  end

  private

  def new_dive_params
    params.require(:dive).permit(:divesite_id, :datetime)
  end
end
