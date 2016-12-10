task :update_weather => :environment do
  dives = Dive.all

  dives.each do |dive|
    dive.set_weather
    # checks if record was updated within last 5 seconds
    if dive.updated_at.to_time > Time.now - 300
      dive.send_reminder
    end
  end
end
