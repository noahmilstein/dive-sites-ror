class Api::V1::UserController < ApiController
  def index
    @currentUser = current_user
    # binding.pry
    respond_to do |format|
      format.json { render json: @currentUser }
    end
  end
end
