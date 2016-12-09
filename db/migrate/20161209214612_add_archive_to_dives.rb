class AddArchiveToDives < ActiveRecord::Migration[5.0]
  def change
    add_column :dives, :archive, :boolean, null: false, default: false
  end
end
