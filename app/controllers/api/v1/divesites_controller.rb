class Api::V1::DivesitesController < ApiController
  def index
    @divesites = Divesite.all
    respond_to do |format|
      format.json { render json: @divesites }
    end
  end
end
