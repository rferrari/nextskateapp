import { vote } from "@/lib/hive/client-functions"
import { voteWithPrivateKey } from "@/lib/hive/server-functions"
import { VoteOperation } from "../../../lib/hive/dhive/lib"
export const handleVote = async (author: string, permlink: string, username: string) => {
  const loginMethod = localStorage.getItem("LoginMethod")
  if (!username) {
    console.error("Username is missing")
    return
  }
  if (loginMethod === "keychain") {
    await vote({
      username: username,
      permlink: permlink,
      author: author,
      weight: 10000,
    })
  } else if (loginMethod === "privateKey") {
    console.log('trying to vote with private key')
    const vote: VoteOperation = [
      "vote",
      {
        voter: username,
        permlink: permlink,
        author: author,
        weight: 10000,
      }
    ]
    const encryptedPrivateKey = localStorage.getItem("EncPrivateKey");
    console.log(encryptedPrivateKey)
    voteWithPrivateKey(encryptedPrivateKey, vote)
  }
}

