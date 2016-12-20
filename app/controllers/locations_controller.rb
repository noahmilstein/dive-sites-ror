class LocationsController < ApplicationController
  before_action :authenticate_user!

  def new
    @location = Location.new
  end

  def create
    @location = Location.new(location_params)
    if @location.save
      redirect_to controller: 'dives', action: 'new', location_id: @location.id
    else
      render :new
    end
  end

  private

  def location_params
    params.require(:location).permit(:name, :longitude, :latitude)
  end
end
