require 'spec_helper'
require 'rails_helper'

# Future user stories
# - autocomplete search
# - user types a location and radius
# - location is geocoded and displays all sites within that radius
# - all sites are displayed on a google map

feature 'schedule a dive', %Q{
  As an authenticated user
  I want to select a divesite from a dropdown menu
  So that I can see the weather at that location
} do

  let!(:user) { FactoryGirl.create(:user) }
  let!(:divesite) { FactoryGirl.create(:divesite) }

  before :each do
    sign_in(user)
  end

  xscenario 'fill out schedule form' do
    fill_dive_form(divesite)

    expect(page).to have_content('Date')
    expect(page).to have_content('Time')
    expect(page).to have_content('Air Temperature')
    expect(page).to have_content('Water Temperature')
    expect(page).to have_content('Wave Height')
    expect(page).to have_content('Wind Speed')
    expect(page).to have_content('Wind Direction')
    expect(page).to have_content('Tide')
    expect(page).to have_content('Weather Description')
    expect(page).to have_content('Precipitation')

  end

  xscenario '' do

  end

end
