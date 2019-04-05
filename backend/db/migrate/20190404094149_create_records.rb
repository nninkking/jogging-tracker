class CreateRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :records do |t|
      t.integer :distance
      t.integer :time
      t.references :user
      t.timestamps
    end
  end
end
