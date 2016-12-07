task :send do
  account_sid = ENV['TWILIO_ACCOUNT_SID']
  auth_token = ENV['TWILIO_AUTH_TOKEN']

  # set up a client to talk to the Twilio REST API
  @client = Twilio::REST::Client.new(account_sid, auth_token)

  all_scheduled_dives = Dive.all

  all_scheduled_dives.each do |dive|
    if dive.send_reminder?
      user = User.where(id: dive.user_id)[0]

      @client.account.messages.create(
        from: '+15082834493 ',
        to: '+15087338306', #user.phone_number
        body: 'I just sent this from my command line - Alex' #dive.message
      )
    end
  end
end
