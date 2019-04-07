class RecordPolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope

  #   def initialize(user, scope)
  #     @user  = user
  #     @scope = scope
  #   end

      def resolve
        scope
      end
    end
  def create?
    user.role == 'admin' || user.role == 'manager' || user.role == 'regular'
  end
  def permitted_attributes
    if user.admin?
      [:user_id, :distance, :time]
    else
      [:distance, :time]
    end
  end
end