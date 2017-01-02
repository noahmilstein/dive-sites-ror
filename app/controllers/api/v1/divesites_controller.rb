class Api::V1::DivesitesController < ApplicationController
  def index
    @divesites = Divesite.all
    respond_to do |format|
      format.json { render json: @divesites }
    end
  end
end
