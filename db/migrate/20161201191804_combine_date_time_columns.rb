class CombineDateTimeColumns < ActiveRecord::Migration[5.0]
  def up
    remove_column :dives, :date
    remove_column :dives, :time
    add_column :dives, :datetime, :datetime, null: false
  end

  def down
    remove_column :dives, :datetime
    add_column :dives, :date, :string
    add_column :dives, :time, :string
  end
end
