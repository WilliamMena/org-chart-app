class NodesController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    all_nodes = Node.all
    respond_to do |format|
      format.html { render html: "There are #{all_nodes.count} nodes" }
      format.json { render json: all_nodes }
    end
  end

  def show
    render json: Node.find(params[:id]) 
  end

  def update
    @node = Node.find(params[:id])

    if node_param["make_root_user"]
      make_root(@node)
      render json: { message: "Node successfully updated." }, status: 200
      return
    end

    if node_param["parent_id"] == @node.id || node_param["parent_id"] == @node.parent_id
      render json: { message: "Can not make this change." }, status: 400
      return
    end

    # byebug
    if node_param["bring_team"]
      @node.parent_id = node_param["parent_id"]
    else
      parent = @node.parent_id
      
      Node.where(parent_id: @node.id).update_all(parent_id: parent)
      @node.parent_id = node_param["parent_id"]
    end

    if @node.save
      render json: { message: "Node successfully updated." }, status: 200
    else
      render json: { error: @node.errors.full_messages}, status: 400
    end
    
    
 end
 
 private
 def node_param
    params.require(:node).permit(:parent_id, :bring_team, :make_root_user)
 end

 def make_root(user)
    old_root = Node.find_by(:root => true)
    old_root.parent_id = user.id
    old_root.root = false;
    old_root.save

    user.parent_id = nil
    user.root = true
    user.save
 end

end
