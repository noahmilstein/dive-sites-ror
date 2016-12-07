class DivesController < ApplicationController
  before_action :authenticate_user!

  def index
    @dives = Dive.where(user: current_user)
  end

  def new
    @dive = Dive.new
  end

  def create
    @dive = Dive.new(new_dive_params)
    @dive.user = current_user
    # @divesite = Divesite.where(id: @dive.divesite_id)[0]
    # @api_result = HTTParty.get("http://api.worldweatheronline.com/premium/v1/marine.ashx?key=#{ENV['MARINE_WEATHER_API_KEY']}&format=json&q=#{@divesite.latitude},#{@divesite.longitude}")

    if @dive.save
      flash[:notice] = 'Dive scheduled successfully!'
      redirect_to dives_path
    else
      flash[:notice] = @dive.errors.full_messages.join(', ')
      render :new
    end
  end

  def history
  end

  private

  def new_dive_params
    params.require(:dive).permit(:divesite_id, :datetime)
  end
end
