require 'spec_helper'
require 'rails_helper'

feature 'sign up', %Q{
  As an unauthenticated user
  I want to sign up
  so that I can schedule a dive
} do

  let(:user) { User.new(first_name: "firstname", last_name: "lastname", email: "email@email.com", phone_number: "(111) 111-1111", password: "password") }

  scenario "specify valid and required information" do
    fill_sign_up_form(user)

    expect(page).to have_content("Welcome! Sign up successful.")
    expect(page).to have_content("Sign Out")
    expect(page).to have_content("Schedule a Dive")
    expect(page).to have_content("Edit Profile")
    expect(page).to have_content("Home")
  end

  scenario "required information is not supplied" do
    visit new_user_registration_path
    fill_in "First Name", with: user.first_name
    fill_in "Last Name", with: user.last_name
    fill_in "Phone Number", with: user.phone_number
    click_button 'Sign Up'

    expect(page).to have_content("can't be blank")
  end

  scenario "password and confirmation don't match" do
    visit new_user_registration_path
    fill_in "First Name", with: user.first_name
    fill_in "Last Name", with: user.last_name
    fill_in "Email", with: user.email
    fill_in "Phone Number", with: user.phone_number
    fill_in "Password", with: user.password
    fill_in "Confirm Password", with: "mustache"
    click_button 'Sign Up'

    expect(page).to have_content("Password confirmation doesn't match")
  end
end
