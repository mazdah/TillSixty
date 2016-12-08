package com.mazdah.tillsixty.goal.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Goal")
public class Goal {

	/*
	 * param.goalTitle = goalTitle;
		param.startDate = startDate;
		param.endDate = endDate;
		param.goalDescription = goalDescription;
		param.owner = userInfo.id;
	 */
	
	@Id
	private String id;
	
	private String goalTitle;
	private String startDate;
	private String endDate;
	private String goalType;
	private String goalSubType;
	private String goalDescription;
	private String owner;
	private String ownerId;
	
	public Goal() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Goal(String id, String goalTitle, String startDate, String endDate,
			String goalType, String goalSubType, String goalDescription,
			String owner, String ownerId) {
		super();
		this.id = id;
		this.goalTitle = goalTitle;
		this.startDate = startDate;
		this.endDate = endDate;
		this.goalType = goalType;
		this.goalSubType = goalSubType;
		this.goalDescription = goalDescription;
		this.owner = owner;
		this.ownerId = ownerId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getGoalTitle() {
		return goalTitle;
	}

	public void setGoalTitle(String goalTitle) {
		this.goalTitle = goalTitle;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getGoalType() {
		return goalType;
	}

	public void setGoalType(String goalType) {
		this.goalType = goalType;
	}

	public String getGoalSubType() {
		return goalSubType;
	}

	public void setGoalSubType(String goalSubType) {
		this.goalSubType = goalSubType;
	}

	public String getGoalDescription() {
		return goalDescription;
	}

	public void setGoalDescription(String goalDescription) {
		this.goalDescription = goalDescription;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((endDate == null) ? 0 : endDate.hashCode());
		result = prime * result
				+ ((goalDescription == null) ? 0 : goalDescription.hashCode());
		result = prime * result
				+ ((goalSubType == null) ? 0 : goalSubType.hashCode());
		result = prime * result
				+ ((goalTitle == null) ? 0 : goalTitle.hashCode());
		result = prime * result
				+ ((goalType == null) ? 0 : goalType.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((owner == null) ? 0 : owner.hashCode());
		result = prime * result + ((ownerId == null) ? 0 : ownerId.hashCode());
		result = prime * result
				+ ((startDate == null) ? 0 : startDate.hashCode());
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
		Goal other = (Goal) obj;
		if (endDate == null) {
			if (other.endDate != null)
				return false;
		} else if (!endDate.equals(other.endDate))
			return false;
		if (goalDescription == null) {
			if (other.goalDescription != null)
				return false;
		} else if (!goalDescription.equals(other.goalDescription))
			return false;
		if (goalSubType == null) {
			if (other.goalSubType != null)
				return false;
		} else if (!goalSubType.equals(other.goalSubType))
			return false;
		if (goalTitle == null) {
			if (other.goalTitle != null)
				return false;
		} else if (!goalTitle.equals(other.goalTitle))
			return false;
		if (goalType == null) {
			if (other.goalType != null)
				return false;
		} else if (!goalType.equals(other.goalType))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (owner == null) {
			if (other.owner != null)
				return false;
		} else if (!owner.equals(other.owner))
			return false;
		if (ownerId == null) {
			if (other.ownerId != null)
				return false;
		} else if (!ownerId.equals(other.ownerId))
			return false;
		if (startDate == null) {
			if (other.startDate != null)
				return false;
		} else if (!startDate.equals(other.startDate))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Goal [id=" + id + ", goalTitle=" + goalTitle + ", startDate="
				+ startDate + ", endDate=" + endDate + ", goalType=" + goalType
				+ ", goalSubType=" + goalSubType + ", goalDescription="
				+ goalDescription + ", owner=" + owner + ", ownerId=" + ownerId
				+ "]";
	}
	
	
}
