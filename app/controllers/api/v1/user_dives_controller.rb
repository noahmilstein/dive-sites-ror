class Api::V1::UserDivesController < ApiController
  def index
    @dives = Dive.where(user: current_user, archive: false)
    respond_to do |format|
      format.json { render json: @dives }
    end
  end
end
