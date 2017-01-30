class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = current_user
    dives = @user.dives

    @archived_dives = []
    @upcoming_dives = []

    dives.each do |dive|
      if dive.archive
        @archived_dives << dive
      else
        @upcoming_dives << dive
      end
    end

    updated_archived_dives = []
    @archived_dives.each do |dive|
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
      updated_archived_dives << hash
    end

    updated_upcoming_dives = []
    @upcoming_dives.each do |dive|
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
      updated_upcoming_dives << hash
    end

    dives_json = { 'archivedDives': updated_archived_dives, 'activeDives': updated_upcoming_dives }
    respond_to do |format|
      format.json { render json: dives_json }
      format.html
    end
  end
end
