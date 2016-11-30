class AddDiveSites < ActiveRecord::Migration[5.0]
  def change
    create_table :divesites do |t|
      t.string :name,       null: false, default: ""
      t.string :latitude,   null: false, default: ""
      t.string :longitude,  null: false, default: ""

      t.timestamps          null: false
    end
  end
end
