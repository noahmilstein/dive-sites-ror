# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'httparty'

response = HTTParty.get('http://api.divesites.com/?mode=sites&lat=47.6031537682643&lng=-122.336164712906&dist=12450')

response['sites'].each do |site|
  if site['name'] && site['lat'] && site['lng']
    site_name = site['name'].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    lat = site['lat'].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    lng = site['lng'].encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
    Divesite.create(name: site_name, latitude: lat, longitude: lng)
  end
end
