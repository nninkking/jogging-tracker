class UserPolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      if user.admin?
        scope.all
      elsif user.manager?
        scope.where(role: :regular)
      else
        scope.where(id: user.id)
      end
    end
  end

  def create?
    user.admin?
  end

  def update?
    user.admin? or record.id == user.id
  end

  def destroy?
    (user.admin? and record.id != user.id) or (user.manager? and record.regular?)
  end
  
  def permitted_attributes
    if user.admin?
      [:firstname, :lastname, :email, :password, :role]
    else
      [:firstname, :lastname, :email, :password]
    end
  end
end