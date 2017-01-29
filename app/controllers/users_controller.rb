class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = current_user
    dives = @user.dives

    @archived_dives = []
    @upcoming_dives = []

    dives.each do |dive|
      if dive.archive
        @archived_dives << dive
      else
        @upcoming_dives << dive
      end
    end
    
    dives_json = { 'archivedDives': @archived_dives, 'activeDives': @upcoming_dives }
    respond_to do |format|
      format.json { render json: dives_json }
      format.html
    end
  end
end
