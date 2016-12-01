# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161201191804) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dives", force: :cascade do |t|
    t.integer  "user_id",             null: false
    t.integer  "divesite_id",         null: false
    t.string   "air_temp"
    t.string   "water_temp"
    t.string   "wave_height"
    t.string   "wind_speed"
    t.string   "tide"
    t.string   "wind_direction"
    t.string   "weather_description"
    t.string   "precipitation"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.datetime "datetime",            null: false
    t.index ["divesite_id"], name: "index_dives_on_divesite_id", using: :btree
    t.index ["user_id"], name: "index_dives_on_user_id", using: :btree
  end

  create_table "divesites", force: :cascade do |t|
    t.string   "name",       default: "", null: false
    t.string   "latitude",   default: "", null: false
    t.string   "longitude",  default: "", null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",             default: "", null: false
    t.string   "last_name",              default: "", null: false
    t.string   "phone_number",           default: "", null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
