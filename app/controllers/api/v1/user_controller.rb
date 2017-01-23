class Api::V1::UserController < ApiController
  def index
    @currentUser = current_user
    respond_to do |format|
      format.json { render json: @currentUser }
    end
  end
end
