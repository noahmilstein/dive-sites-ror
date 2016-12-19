class LocationsController < ApplicationController
  before_action :authenticate_user!

  def new
    @location = Location.new
  end

  def create
    @location = Location.new(location_params)
    if @location.save
      @location.id = params[:location_id]
      redirect_to new_dive_path
    else
      render :new
    end
  end

  private

  def location_params
    params.require(:location).permit(:name, :longitude, :latitude)
  end
end
