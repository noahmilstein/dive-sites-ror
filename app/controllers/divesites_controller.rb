class DivesitesController < ApplicationController
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.html
      format.json { @divesites = Divesites.search(params[:term]) }
    end
  end
end
