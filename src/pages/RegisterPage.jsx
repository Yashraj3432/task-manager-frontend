function RegisterPage() {
    return (
        <div>
            <h1>Register</h1>

            <form>
                <input type="text" placeholder="Name" />
                <br /><br />

                <input type="email" placeholder="Email" />
                <br /><br />

                <input type="password" placeholder="Password" />
                <br /><br />

                <button>Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;