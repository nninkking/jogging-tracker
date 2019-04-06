class ChangeUserField < ActiveRecord::Migration[5.2]

  def change
  	change_column :users, :role, :integer, :default => User.roles[:regular]
  end
  
end
