import * as api from "../index";

export const createCandidate = async (candidateData) => {
  try {
    const {
      firstName,
      lastName,
      appliedPosition,
      NIC,
      phoneNumber,
      email,
      cv,
    } = candidateData;

    const candidateName = firstName + " " + lastName;
    candidateData = {
      candidateName,
      appliedPosition,
      NIC: NIC.toUpperCase(),
      phoneNumber,
      email,
      cv,
    };
    const { data } = await api.createCandidate(candidateData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const searchCandidate = async (NIC) => {
  try {
    if (NIC) {
      const { data } = await api.searchCandidate(NIC);
      return data.candidate;
    } else {
      return null;
    }
    //console.log( data.candidate[0]);
  } catch (error) {
    console.log(error);
  }
};

export const updateCandidate = async (candidateData, candidateId) => {
  try {
    const {
      firstName,
      lastName,
      appliedPosition,
      NIC,
      phoneNumber,
      email,
      cv,
    } = candidateData;
    const LastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const FirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const candidateName = FirstName + " " + LastName;
    candidateData = {
      candidateName,
      appliedPosition,
      NIC: NIC.toUpperCase(),
      phoneNumber,
      email,
      cv,
    };
    const { data } = await api.updateCandidate(candidateData, candidateId);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchCandidates = async () => {
  try {
    const { data } = await api.fetchCandidates();

    return data.candidates;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecentCandidates = async () => {
  try {
    const { data } = await api.fetchRecentCandidates();

    return data.candidates;
  } catch (error) {
    console.log(error);
  }
};
