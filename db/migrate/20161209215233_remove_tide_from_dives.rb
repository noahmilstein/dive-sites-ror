class RemoveTideFromDives < ActiveRecord::Migration[5.0]
  def up
    remove_column :dives, :tide
  end

  def down
    add_column :dives, :tide, :string
  end
end
