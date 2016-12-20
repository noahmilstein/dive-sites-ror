class Location < ActiveRecord::Base
  validates :name, presence: true

  geocode_by :name
  after_validation :geocode
end
