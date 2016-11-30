class CreateDives < ActiveRecord::Migration[5.0]
  def change
    create_table :dives do |t|
      t.belongs_to :user,     null: false
      t.belongs_to :divesite, null: false

      t.string :date,         null: false
      t.string :time,         null: false

      t.string :air_temp
      t.string :water_temp
      t.string :wave_height
      t.string :wind_speed
      t.string :tide
      t.string :wind_direction
      t.string :weather_description
      t.string :precipitation

      t.timestamps            null: false
    end
  end
end
