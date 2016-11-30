class Dive < ActiveRecord::Base
  belongs_to :user
  belongs_to :divesite

  validates :date, presence: true
  validates :time, presence: true

  ## pending future validation with active record callbacks
  # validates :air_temp
  # validates :water_temp
  # validates :wave_height
  # validates :wind_speed
  # validates :tide
  # validates :wind_direction
  # validates :weather_description
  # validates :precipitation
end
