class Api::V1::UserDivesController < ApiController
  def index
    dives = Dive.where(user: current_user, archive: false)
    # binding.pry
    dives_json = { 'sites': dives }
    respond_to do |format|
      format.json { render json: dives_json }
      format.html
    end
  end
end
