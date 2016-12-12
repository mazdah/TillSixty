package com.mazdah.tillsixty.account.domain;

import org.springframework.data.annotation.Id;

public class Goal {

	/*
	 * param.goalTitle = goalTitle;
		param.startDate = startDate;
		param.endDate = endDate;
		param.goalDescription = goalDescription;
		param.owner = userInfo.id;
	 */

	private String goalId;	
	private String goalTitle;
	private String startDate;
	private String endDate;
	private String goalType;
	private String goalSubType;
	private String goalDescription;
	private String goalStatus;
	
	public Goal() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public Goal(String goalId, String goalTitle, String startDate,
			String endDate, String goalType, String goalSubType,
			String goalDescription, String goalStatus) {
		super();
		this.goalId = goalId;
		this.goalTitle = goalTitle;
		this.startDate = startDate;
		this.endDate = endDate;
		this.goalType = goalType;
		this.goalSubType = goalSubType;
		this.goalDescription = goalDescription;
		this.goalStatus = goalStatus;
	}



	public String getGoalId() {
		return goalId;
	}

	public void setGoalId(String goalId) {
		this.goalId = goalId;
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
	
	public String getGoalStatus() {
		return goalStatus;
	}

	public void setGoalStatus(String goalStatus) {
		this.goalStatus = goalStatus;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((endDate == null) ? 0 : endDate.hashCode());
		result = prime * result
				+ ((goalDescription == null) ? 0 : goalDescription.hashCode());
		result = prime * result + ((goalId == null) ? 0 : goalId.hashCode());
		result = prime * result
				+ ((goalStatus == null) ? 0 : goalStatus.hashCode());
		result = prime * result
				+ ((goalSubType == null) ? 0 : goalSubType.hashCode());
		result = prime * result
				+ ((goalTitle == null) ? 0 : goalTitle.hashCode());
		result = prime * result
				+ ((goalType == null) ? 0 : goalType.hashCode());
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
		if (goalId == null) {
			if (other.goalId != null)
				return false;
		} else if (!goalId.equals(other.goalId))
			return false;
		if (goalStatus == null) {
			if (other.goalStatus != null)
				return false;
		} else if (!goalStatus.equals(other.goalStatus))
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
		if (startDate == null) {
			if (other.startDate != null)
				return false;
		} else if (!startDate.equals(other.startDate))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Goal [goalId=" + goalId + ", goalTitle=" + goalTitle
				+ ", startDate=" + startDate + ", endDate=" + endDate
				+ ", goalType=" + goalType + ", goalSubType=" + goalSubType
				+ ", goalDescription=" + goalDescription + ", goalStatus="
				+ goalStatus + "]";
	}

}
