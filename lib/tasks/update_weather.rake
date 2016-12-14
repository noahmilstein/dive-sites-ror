task :update_weather => :environment do
  dives = Dive.all

  dives.each do |dive|
    dive.set_weather
    if dive.updated_at.to_time > Time.now - 300 && !dive.archive
      dive.send_reminder
    end
  end
end
