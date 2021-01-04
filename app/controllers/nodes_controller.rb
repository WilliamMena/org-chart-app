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
    params.require(:node).permit(:parent_id, :bring_team)
 end

end
