class AddFieldsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :firstname, :string
    add_column :users, :lastname, :string
    add_column :users, :role, :integer
    add_column :users, :password_salt, :string
    add_column :users, :password_hash, :string
  end
end
