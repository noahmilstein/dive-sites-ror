task :update_weather => :environment do
  dives = Dive.all

  dives.each do |dive|
    dive.set_weather
    if dive.updated_at.to_date == Date.today
      dive.send_reminder
    end
  end
end
