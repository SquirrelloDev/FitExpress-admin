import useUserListQuery from "../queries/users/listing";

export function Users() {
    const {isLoading} = useUserListQuery({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFsdGhfZGF0YSI6eyJ1c2VyX2hlaWdodCI6MTkyLCJ1c2VyX3dlaWdodF9jdXJyZW50Ijo5MCwidXNlcl93ZWlnaHRfcGxhbm5lZCI6NzYsImFnZSI6MjMsInBhbF9hY3RpdmUiOjEuNCwicGFsX3Bhc3NpdmUiOjEuMiwidXNlcl9nb2FsIjoiYmFsYW5jZSIsImJtaSI6MjMuNSwiYm1pX3BsYW5uZWQiOjIwLCJjYWxvcmllc19kZW1hbmQiOjIwMDAsIndhdGVyX2RlbWFuZCI6MzAwMH0sIl9pZCI6IjY1NmRjMGViY2MxYzI3ZTQ3NTE1OGMzNSIsIm5hbWUiOiJEaWV0ZXR5ayIsImVtYWlsIjoiZGlldGV0eWtAZml0ZXhwcmVzcy5jb20iLCJiaXJ0aF9kYXRlIjoiMjAwMC0xMS0wOVQwMDowMDowMC4wMDBaIiwicGFzc3dvcmQiOiIkMmIkMTIkWjBvMnp3ZmRON0lmM3YuY21yYWQydVU3ODQ5c2QvcGpYNU1XVlVDckRFVWJLRnZ4STFKZkMiLCJyb2xlIjoyLCJvcmRlcl9pZHMiOltdLCJhZGRyZXNzZXMiOltdLCJyZWRlZW1lZF9jb2RlcyI6W10sInJlc2V0VG9rZW4iOiIiLCJfX3YiOjAsImlhdCI6MTcwMTY5NjI4OCwiZXhwIjoxNzAxNjk5ODg4fQ.fNm-Dv1V01aspFAOa5UgSj-OGW6Qy9xYnG-bwFcka9A'
    })
    if (isLoading) return <p>Loading users...</p>
    return (
        <>
            {/*{data.map(user => <p>{user.name}</p>)}*/}
        </>
    )
}