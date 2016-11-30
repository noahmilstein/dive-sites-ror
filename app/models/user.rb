class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: /@/ }

  # fix this validation with a custom method later
  validates :phone_number, presence: true 

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
