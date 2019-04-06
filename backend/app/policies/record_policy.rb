class RecordPolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      if user.admin?
        scope.all
      else
        scope.where(user: user)
      end
    end
  end

  def create?
    update?
  end

  def update?
    user.admin? or record.user_id == user.id
  end

  def destroy?
    update?
  end
  
  def permitted_attributes
    if user.admin?
      [:user_id, :distance, :time]
    else
      [:distance, :time]
    end
  end
end