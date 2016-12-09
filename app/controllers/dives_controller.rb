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

    if @dive.save
      flash[:notice] = 'Dive scheduled successfully!'
      redirect_to dives_path
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
