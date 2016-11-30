class User < ApplicationRecord
  has_many :dives
  has_many :divesites, through: :dives

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: /@/ }
  # password constraints
  validates :password, presence: true

  # fix this validation with a custom active record callback method later
  validates :phone_number, presence: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
