package com.mazdah.tillsixty.goal.domain;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Elements")
public class Elements {

	@Id
	private String id;
	
	private String userId;
	private String goalId;
	private String elementType;
	private String title;
	private String description;
	private List<Media> mediaList;
	private String name;
	private String email;
	private List<SnsAccount> snsIdList;
	private String createDate;
	private String updateDate;
	
	public Elements() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Elements(String id, String userId, String goalId,
			String elementType, String title, String description,
			List<Media> mediaList, String name, String email,
			List<SnsAccount> snsIdList, String createDate, String updateDate) {
		super();
		this.id = id;
		this.userId = userId;
		this.goalId = goalId;
		this.elementType = elementType;
		this.title = title;
		this.description = description;
		this.mediaList = mediaList;
		this.name = name;
		this.email = email;
		this.snsIdList = snsIdList;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getGoalId() {
		return goalId;
	}

	public void setGoalId(String goalId) {
		this.goalId = goalId;
	}

	public String getElementType() {
		return elementType;
	}

	public void setElementType(String elementType) {
		this.elementType = elementType;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Media> getMediaList() {
		return mediaList;
	}

	public void setMediaList(List<Media> mediaList) {
		this.mediaList = mediaList;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<SnsAccount> getSnsIdList() {
		return snsIdList;
	}

	public void setSnsIdList(List<SnsAccount> snsIdList) {
		this.snsIdList = snsIdList;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((createDate == null) ? 0 : createDate.hashCode());
		result = prime * result
				+ ((description == null) ? 0 : description.hashCode());
		result = prime * result
				+ ((elementType == null) ? 0 : elementType.hashCode());
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((goalId == null) ? 0 : goalId.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result
				+ ((mediaList == null) ? 0 : mediaList.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result
				+ ((snsIdList == null) ? 0 : snsIdList.hashCode());
		result = prime * result + ((title == null) ? 0 : title.hashCode());
		result = prime * result
				+ ((updateDate == null) ? 0 : updateDate.hashCode());
		result = prime * result + ((userId == null) ? 0 : userId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Elements other = (Elements) obj;
		if (createDate == null) {
			if (other.createDate != null)
				return false;
		} else if (!createDate.equals(other.createDate))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (elementType == null) {
			if (other.elementType != null)
				return false;
		} else if (!elementType.equals(other.elementType))
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (goalId == null) {
			if (other.goalId != null)
				return false;
		} else if (!goalId.equals(other.goalId))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (mediaList == null) {
			if (other.mediaList != null)
				return false;
		} else if (!mediaList.equals(other.mediaList))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (snsIdList == null) {
			if (other.snsIdList != null)
				return false;
		} else if (!snsIdList.equals(other.snsIdList))
			return false;
		if (title == null) {
			if (other.title != null)
				return false;
		} else if (!title.equals(other.title))
			return false;
		if (updateDate == null) {
			if (other.updateDate != null)
				return false;
		} else if (!updateDate.equals(other.updateDate))
			return false;
		if (userId == null) {
			if (other.userId != null)
				return false;
		} else if (!userId.equals(other.userId))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Elements [id=" + id + ", userId=" + userId + ", goalId="
				+ goalId + ", elementType=" + elementType + ", title=" + title
				+ ", description=" + description + ", mediaList=" + mediaList
				+ ", name=" + name + ", email=" + email + ", snsIdList="
				+ snsIdList + ", createDate=" + createDate + ", updateDate="
				+ updateDate + "]";
	}
	
	
}
