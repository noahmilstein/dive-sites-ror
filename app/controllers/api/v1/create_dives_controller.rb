# class Api::V1::ScheduledDivesController < ApiController
#   before_action :authenticate_user!
#
#   def create
#     @dive = Dive.create(new_dive_params)
#     @dives = Dive.all
#     @dive.user = current_user
#     respond_to do |format|
#       format.json do
#         render json: @dives
#       end
#     end
#   end
#
#   # stop being a cunt, Kyle
#   # def create
#   #   @dive = Dive.new(new_dive_params)
#   #   @dive.user = current_user
#   #
#   #   if @dive.save
#   #     flash[:notice] = 'Dive scheduled successfully!'
#   #     # redirect_to dives_path
#   #     respond_to do |format|
#   #       format.json do
#   #         render json: @dive
#   #       end
#   #     end
#   #   else
#   #     flash[:notice] = @dive.errors.full_messages.join(', ')
#   #
#   #     # render :new
#   #   end
#   # end
#
#   private
#
#   def new_dive_params
#     params.require(:dive).permit(:divesite_id, :datetime)
#   end
# end
