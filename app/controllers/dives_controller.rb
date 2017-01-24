class DivesController < ApplicationController
  before_action :authenticate_user!

  def index
    @dives = Dive.where(user: current_user, archive: false)

    dives_json = { 'dives': @dives, 'currentUser': current_user }

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
