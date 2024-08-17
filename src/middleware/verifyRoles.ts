export function verifyRole(...roles: string[]) {
    return (req: any, res: any, next: any) => {
        
        if(!req.user.role) return res.status(401).send('Unauthorized');

        const rolesArray = [...roles]

        if (!rolesArray.includes(req.user.role)) return res.status(401).send('Unauthorized');

        next();
    }
}