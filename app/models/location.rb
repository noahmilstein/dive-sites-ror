class Location < ActiveRecord::Base
  validates :name, presence: true
  geocoded_by :name
  after_validation :geocode

  has_many :dives
end
