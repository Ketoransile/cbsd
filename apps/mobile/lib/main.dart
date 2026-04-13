import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Entrepreneur-Investor Platform',
      theme: ThemeData(
        colorSchemeSeed: Colors.indigo,
        useMaterial3: true,
      ),
      home: const HealthCheckScreen(),
    );
  }
}

class HealthCheckScreen extends StatefulWidget {
  const HealthCheckScreen({super.key});

  @override
  State<HealthCheckScreen> createState() => _HealthCheckScreenState();
}

class _HealthCheckScreenState extends State<HealthCheckScreen> {
  String _status = 'Loading...';

  @override
  void initState() {
    super.initState();
    _fetchHealth();
  }

  Future<void> _fetchHealth() async {
    try {
      final response = await http.get(Uri.parse('http://10.0.2.2:3001/health'));
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          _status = const JsonEncoder.withIndent('  ').convert(data);
        });
      }
    } catch (e) {
      setState(() {
        _status = 'Error: $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Health Check')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: SelectableText(
          _status,
          style: const TextStyle(fontFamily: 'monospace', fontSize: 14),
        ),
      ),
    );
  }
}
