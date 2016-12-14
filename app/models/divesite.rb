class Divesite < ActiveRecord::Base
  has_many :dives
  has_many :users, through: :dives

  validates :name, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true

  def self.search(term)
    # consider refactor with ILIKE
    where('LOWER(name) LIKE :term', term: "%#{term.downcase}")
  end
end
