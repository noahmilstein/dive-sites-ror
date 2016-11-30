FactoryGirl.define do
  factory :user do
    sequence(:first_name) { |n| "some_bloke_#{n + 1}"}
    sequence(:last_name) { |n| "el_duderino#{n + 1}"}
    sequence(:email) { |n| "my_email_address#{n + 1}@my_email_address#{n + 1}.com"}
    sequence(:phone_number) { |n| "(555)-555-555#{n + 1}"}
    sequence(:password) { |n| "password#{n}"}    
  end
end
